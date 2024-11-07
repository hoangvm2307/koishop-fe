import { useEffect, useState } from "react";
import { getKoiFishList, getKoiFishById, getKoifishFilter, getKoiFishByIds, getRelatedKoiFish, createKoiFish, updateKoiFish, FilterData, KoiFish, KoiFishCreate, PaginationInfo, deleteKoiFish } from "@/lib/api/koifishAPI";
export const useKoiFishList = () => {
    const [koiFishList, setKoiFishList] = useState<KoiFish[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchKoiFishList = async (filters?: Partial<FilterData>) => {
        setLoading(true);
        setError(null);
        try {
            const { items, pagination } = await getKoiFishList(filters);
            setKoiFishList(items);
            setPagination(pagination);
        } catch (err) {
            setError("Failed to fetch Koi fish list.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch the Koi fish list when the hook is first used
    useEffect(() => {
        fetchKoiFishList(); // Fetch the latest Koi fish data
    }, []); // Empty dependency array means this runs once when the component mounts

    return {
        data: koiFishList,
        pagination,
        loading,
        error,
        fetchKoiFishList,
    };
};

export const useKoiFishById = () => {
    const [koiFish, setKoiFish] = useState<KoiFish | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchKoiFishById = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getKoiFishById(id);
            setKoiFish(data);
        } catch (err) {
            setError("Failed to fetch Koi fish by ID.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        koiFish,
        loading,
        error,
        fetchKoiFishById,
    };
};

export const useKoiFishFilter = () => {
    const [filters, setFilters] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchKoiFishFilter = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getKoifishFilter();
            setFilters(data);
        } catch (err) {
            setError("Failed to fetch Koi fish filters.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        filters,
        loading,
        error,
        fetchKoiFishFilter,
    };
};

export const useKoiFishByIds = () => {
    const [koiFishList, setKoiFishList] = useState<KoiFish[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchKoiFishByIds = async (ids: string[]) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getKoiFishByIds(ids);
            setKoiFishList(data);
        } catch (err) {
            setError("Failed to fetch Koi fish by IDs.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        koiFishList,
        loading,
        error,
        fetchKoiFishByIds,
    };
};

export const useRelatedKoiFish = () => {
    const [relatedKoiFish, setRelatedKoiFish] = useState<KoiFish[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRelatedKoiFish = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getRelatedKoiFish(id);
            setRelatedKoiFish(data);
        } catch (err) {
            setError("Failed to fetch related Koi fish.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        relatedKoiFish,
        loading,
        error,
        fetchRelatedKoiFish,
    };
};

export const useCreateKoiFish = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const createNewKoiFish = async (userId: number, data: KoiFishCreate) => {
        setLoading(true);
        setError(null);
        try {
            const newKoiFish = await createKoiFish(userId, data);
            return newKoiFish;
        } catch (err) {
            setError("Failed to create Koi fish.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        createNewKoiFish,
    };
};

// Hook for updating an existing Koi Fish
export const useUpdateKoiFish = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const updateExistingKoiFish = async (id: string, data: KoiFish) => {
        setLoading(true);
        setError(null);
        try {
            const updatedKoiFish = await updateKoiFish(id, data);
            return updatedKoiFish;
        } catch (err) {
            setError("Failed to update Koi fish.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        updateExistingKoiFish,
    };
};

export const useDeleteKoiFish = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const deleteKoiFishFunction = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await deleteKoiFish(id); 
            if (!response.ok) {
                throw new Error("Failed to delete Koi fish");
            }
            return response.json(); 
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        deleteKoiFish,
    };
};