import { useState, useEffect } from 'react';
import { getSensorHistory } from '../services/api';

export function useSensorData(limit = 100) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const history = await getSensorHistory(limit);
        setData(history);
      } catch (err: any) {
        setError(err.message || 'Error fetching sensor history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [limit]);

  return { data, setData, loading, error };
}
