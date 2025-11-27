import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAnalytics = () => {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      // Fetch all data in parallel
      const [
        patientsResult,
        visitsResult,
        emergencyCasesResult,
        metricsResult,
        facilitiesResult,
        qualityMetricsResult,
        surveysResult
      ] = await Promise.all([
        supabase.from('patients').select('date_of_birth'),
        supabase.from('patient_visits').select('cost, diagnosis, visit_type, visit_date'),
        supabase.from('emergency_cases').select('status, arrival_time'),
        supabase.from('analytics_metrics').select('*')
          .gte('period_start', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
        supabase.from('facilities').select('facility_type, status, current_occupancy, capacity'),
        supabase.from('quality_metrics').select('metric_type, metric_name, metric_value')
          .gte('recorded_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
          .order('recorded_at', { ascending: false }),
        supabase.from('patient_surveys').select('satisfaction_score')
          .gte('survey_date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      ]);

      if (patientsResult.error) throw patientsResult.error;
      if (visitsResult.error) throw visitsResult.error;
      if (emergencyCasesResult.error) throw emergencyCasesResult.error;
      if (metricsResult.error) throw metricsResult.error;
      if (facilitiesResult.error) throw facilitiesResult.error;
      if (qualityMetricsResult.error) throw qualityMetricsResult.error;
      if (surveysResult.error) throw surveysResult.error;

      const patients = patientsResult.data || [];
      const visits = visitsResult.data || [];
      const emergencyCases = emergencyCasesResult.data || [];
      const metrics = metricsResult.data || [];
      const facilities = facilitiesResult.data || [];
      const qualityMetrics = qualityMetricsResult.data || [];
      const surveys = surveysResult.data || [];

      // Calculate cost per patient
      const avgCost = visits.length > 0
        ? Math.round(visits.reduce((sum, v) => sum + Number(v.cost || 0), 0) / visits.length)
        : 0;

      // Calculate patient demographics (age groups)
      const calculateAge = (dob: string) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      };

      const ageGroups = {
        '0-18': 0,
        '19-35': 0,
        '36-65': 0,
        '65+': 0,
      };

      patients.forEach(p => {
        const age = calculateAge(p.date_of_birth);
        if (age <= 18) ageGroups['0-18']++;
        else if (age <= 35) ageGroups['19-35']++;
        else if (age <= 65) ageGroups['36-65']++;
        else ageGroups['65+']++;
      });

      const totalPatients = patients.length || 1;
      const demographics = {
        '0-18': Math.round((ageGroups['0-18'] / totalPatients) * 100),
        '19-35': Math.round((ageGroups['19-35'] / totalPatients) * 100),
        '36-65': Math.round((ageGroups['36-65'] / totalPatients) * 100),
        '65+': Math.round((ageGroups['65+'] / totalPatients) * 100),
      };

      // Count top conditions
      const conditionCounts: Record<string, number> = {};
      visits.forEach(v => {
        if (v.diagnosis) {
          conditionCounts[v.diagnosis] = (conditionCounts[v.diagnosis] || 0) + 1;
        }
      });
      
      const topConditions = Object.entries(conditionCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 4)
        .map(([condition, count]) => ({ condition, count }));

      // Calculate patient flow percentages
      const recentCases = emergencyCases.filter(c => 
        new Date(c.arrival_time).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
      );
      const recentVisits = visits.filter(v => 
        new Date(v.visit_date).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
      );

      const emergencyAdmissions = recentCases.length;
      const scheduledProcedures = recentVisits.filter(v => v.visit_type === 'scheduled' || v.visit_type === 'procedure').length;
      const outpatientVisits = recentVisits.filter(v => v.visit_type === 'outpatient' || v.visit_type === 'consultation').length;
      
      const totalFlow = emergencyAdmissions + scheduledProcedures + outpatientVisits || 1;
      
      const patientFlow = {
        emergency: Math.round((emergencyAdmissions / totalFlow) * 100),
        scheduled: Math.round((scheduledProcedures / totalFlow) * 100),
        outpatient: Math.round((outpatientVisits / totalFlow) * 100),
      };

      // Calculate real-time facility metrics
      const icuBeds = facilities.filter(f => f.facility_type === 'icu_bed');
      const icuBedsOccupied = icuBeds.filter(f => f.status === 'occupied').length;
      const icuBedsTotal = icuBeds.length;

      const operatingRooms = facilities.filter(f => f.facility_type === 'operating_room');
      const operatingRoomsInUse = operatingRooms.filter(f => f.status === 'occupied').length;
      const operatingRoomsTotal = operatingRooms.length;

      // Calculate patient satisfaction from surveys
      const avgSatisfaction = surveys.length > 0
        ? surveys.reduce((sum, s) => sum + s.satisfaction_score, 0) / surveys.length
        : 0;

      // Get latest quality metrics (no defaults - real data only)
      const getLatestQualityMetric = (type: string, name: string) => {
        const metric = qualityMetrics.find(m => m.metric_type === type && m.metric_name === name);
        return metric ? Number(metric.metric_value) : 0;
      };

      // Get metrics from analytics_metrics table (no defaults - real data only)
      const getMetric = (name: string) => {
        const metric = metrics.find(m => m.metric_name === name);
        return metric ? Number(metric.metric_value) : 0;
      };

      return {
        avgCost,
        demographics,
        topConditions,
        patientFlow,
        patientSatisfaction: avgSatisfaction > 0 ? Math.round(avgSatisfaction * 10) / 10 : 0,
        avgLengthOfStay: getMetric('avg_length_of_stay'),
        readmissionRate: getMetric('readmission_rate'),
        icuBeds: icuBedsOccupied,
        icuBedsTotal: icuBedsTotal || 0,
        operatingRooms: operatingRoomsInUse,
        operatingRoomsTotal: operatingRoomsTotal || 0,
        staffCoverage: getMetric('staff_coverage'),
        safetyScore: getLatestQualityMetric('safety', 'Safety Score'),
        clinicalOutcomes: getLatestQualityMetric('clinical_outcome', 'Clinical Outcomes Rate'),
        complianceRate: getLatestQualityMetric('compliance', 'Compliance Rate'),
        errorRate: getLatestQualityMetric('error', 'Medical Error Rate'),
      };
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};
