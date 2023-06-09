import { useState, useEffect, useMemo } from "react";
import { getItem } from "../../localStorage/getItem";

/**
 * GET method for api fetch.
 * @param {string} url endpoint
 * @returns an response from the API, with data, isLoading, isError.
 * @example
 * ```
 * import { useGet } from "path/hooks/service/get";
 *
 *
 * function App() {
 * const { data, isLoading, isError } = useGet(apiUrl);
 *
 * if (isLoading) {
 *   return <div>Loading</div>;
 * }
 *
 * if (isError) {
 *   return <div>Error</div>;
 * }
 *
 * return (
 * <>
 *   <Component Prop={data}
 * </>
 * )
 *
 * }
 * ```
 */
export function useGet(url, offset, limit) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const token = getItem("token");

  const options = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }, [token]);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);
        let dataResults;

          if(offset === undefined) {
            dataResults = await fetch(url, options);
            if(dataResults.errors && dataResults.errors.length > 0) {
              const errorMessage = data.errors[0].message;
              throw new Error(errorMessage);
            }
          } else {
          dataResults = await fetch(`${url}?limit=${limit}&offset=${offset}`);
          if (!dataResults.ok) {
            throw new Error(dataResults.statusCode);
          }
        }

        const json = await dataResults.json();

        setData(json);
      } catch (error) {
        console.log(error);
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url, options, data.errors, offset, limit]);

  if (data) {
    return { data, isLoading, isError };
  }
}
