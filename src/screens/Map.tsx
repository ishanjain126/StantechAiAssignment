import React, {useEffect, useState} from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {View, StyleSheet} from 'react-native';

interface Location {
  latitude: number;
  longitude: number;
}

const Map: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Location>({
    latitude: 12.91772,
    longitude: 77.65806,
  });

  // For testing purposes
  // const [locations, setLocations] = useState<Location[]>([
  //   {
  //     latitude: 12.91772,
  //     longitude: 77.65806,
  //   },
  //   {
  //     latitude: 12.934533,
  //     longitude: 77.626579,
  //   },
  //   {
  //     latitude: 12.9562593,
  //     longitude: 77.65346290000002,
  //   },
  // ]);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    // Get the initial user location
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setUserLocation({latitude, longitude});
        setLocations(prevLocations => [
          ...prevLocations,
          {latitude, longitude},
        ]);
      },
      error => console.log(error),
      {enableHighAccuracy: true},
    );

    // Set up the interval for periodic updates
    const locationTimer = setInterval(() => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setUserLocation({latitude, longitude});
          setLocations(prevLocations => [
            ...prevLocations,
            {latitude, longitude},
          ]);
        },
        error => console.log(error),
        {enableHighAccuracy: true},
      );
    }, 60000);

    return () => clearInterval(locationTimer);
  }, []);

  const calculateRotation = (
    coord1: Location,
    coord2: Location | undefined,
  ) => {
    if (coord2) {
      const dx = coord2.longitude - coord1.longitude;
      const dy = coord2.latitude - coord1.latitude;
      return (Math.atan2(dy, dx) * 180) / Math.PI;
    }
    return 0;
  };

  if (!userLocation) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        region={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}>
            <View
              style={[
                styles.triangle,
                {
                  transform: [
                    {
                      rotate: `${
                        index < locations.length - 1
                          ? calculateRotation(location, locations[index + 1])
                          : 0
                      }deg`,
                    },
                  ],
                },
              ]}
            />
          </Marker>
        ))}
        {locations.length > 1 && (
          <Polyline coordinates={locations} strokeColor="red" strokeWidth={3} />
        )}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderLeftColor: 'transparent',
    borderRightWidth: 15,
    borderRightColor: 'transparent',
    borderBottomWidth: 30,
    borderBottomColor: 'red',
  },
});
