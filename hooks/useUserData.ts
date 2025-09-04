import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const useUserData = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("user_data");
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userData, loading };
};

export default useUserData;
