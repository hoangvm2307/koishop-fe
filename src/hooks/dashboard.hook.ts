import { getFavCustomer } from "@/lib/api/dashboard";
import { useEffect, useState } from "react";

export const useGetFavCustomer = () => {
  const [favCustomer, setFavCustomer] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavCustomer = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFavCustomer();
      setFavCustomer(data);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching favorite customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavCustomer();
  }, []);

  return { favCustomer, loading, error };
};

import { getRankingOrigin } from "@/lib/api/dashboard";

export const useGetRankingOrigin = () => {
  const [rankingOrigin, setRankingOrigin] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRankingOrigin = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRankingOrigin();
      setRankingOrigin(data);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching ranking origin.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankingOrigin();
  }, []);

  return { rankingOrigin, loading, error };
};

import { getConsignmentByType } from "@/lib/api/dashboard";

export const useGetConsignmentByType = () => {
  const [consignmentByType, setConsignmentByType] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConsignmentByType = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getConsignmentByType();
      setConsignmentByType(data);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching consignment by type.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsignmentByType();
  }, []);

  return { consignmentByType, loading, error };
};

import { getConsignmentByMonth } from "@/lib/api/dashboard";

export const useGetConsignmentByMonth = () => {
  const [consignmentByMonth, setConsignmentByMonth] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConsignmentByMonth = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getConsignmentByMonth();
      setConsignmentByMonth(data);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching consignment by month.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsignmentByMonth();
  }, []);

  return { consignmentByMonth, loading, error };
};