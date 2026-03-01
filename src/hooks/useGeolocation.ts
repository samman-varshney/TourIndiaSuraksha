import { useState, useEffect } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  error: string | null;
  loading: boolean;
}

/** Subscribes to the browser Geolocation API and returns live coordinates */
export const useGeolocation = (watchPosition = false): GeolocationState => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, error: 'Geolocation is not supported', loading: false }));
      return;
    }

    const onSuccess = ({ coords }: GeolocationPosition) => {
      setState({
        latitude: coords.latitude,
        longitude: coords.longitude,
        accuracy: coords.accuracy,
        error: null,
        loading: false,
      });
    };

    const onError = (err: GeolocationPositionError) => {
      setState((s) => ({ ...s, error: err.message, loading: false }));
    };

    const options: PositionOptions = { enableHighAccuracy: true, timeout: 10_000 };

    if (watchPosition) {
      // Continuously update position as the user moves
      const watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      // Single one-shot position fetch
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    }
  }, [watchPosition]);

  return state;
};
