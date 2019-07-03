import {
  useState, useEffect, useReducer, useCallback
} from 'react';
import randomDelay from './randomDelay';
import randomData from './randomData';
import contains from './contains';

export function ajaxReducer(state, { type, payload } = {}) {
  switch (type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: payload
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case 'FETCH_NO_URL':
      return {
        ...state,
        isLoading: false,
        isError: false
      };
    case 'RESET_DATA':
      return {
        ...state,
        data: [],
      };
    default:
      throw new Error();
  }
}

export default function useFetch(initialUrl, initialData) {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(ajaxReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      if (!url) {
        dispatch({ type: 'FETCH_NO_URL' });
        return;
      }

      dispatch({ type: 'FETCH_INIT' });

      try {
        await randomDelay();
        const result = randomData.filter(({ display }) => contains(display, url));

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  const doFetch = useCallback((fetchUrl) => {
    setUrl(fetchUrl);
  }, []);

  const resetData = useCallback(() => {
    dispatch({ type: 'RESET_DATA' });
  }, []);

  return { ...state, doFetch, resetData };
}
