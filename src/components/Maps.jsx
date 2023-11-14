import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { setDefaults, fromLatLng } from 'react-geocode'
import '../App.css'
import { useState, useEffect, useMemo } from 'react'

const Maps = ({ getLocation }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPAS_KEY
    })
    setDefaults({
        key: import.meta.env.VITE_GOOGLE_MAPAS_KEY,
        language: 'es',
        region: 'mx'
    })

    const center = useMemo(() => ({
        lat: 19.6975643,
        lng: -101.1623696,
    }), [])

    const [marker, setMarker] = useState(null)

    useEffect(() => {
        console.log('location', marker)
        if (marker) {
        fromLatLng(marker?.lat || center.lat, marker?.lng || center.lng)
            .then(({ results }) => {
                // const { lat, lng } = results[0].geometry.location
                console.log('direccion', results[0].address_components)
                const location = {
                    num_ext: results[0].address_components[0].long_name,
                    street: results[0].address_components[1].long_name,
                    neighborhood: results[0].address_components[2].long_name,
                    city: results[0].address_components[3].long_name,
                    state: results[0].address_components[4].long_name,
                    cp: results[0].address_components[6].long_name,

                }
                getLocation(location)

            }),
            error => {
                console.error('Error al obtener la direccion', error)
            }
        }
    }, [marker])

    // useEffect(() => {
    //     count.current = 0
    // }, [])

    const mapClick = (e) => {
        // console.log('entro', e.latLng.lat())
        // console.log('entro', e.latLng.lng())
        setMarker({
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        })
    }


    if (!isLoaded) return <div>Cargando mapa...</div>
     console.log('fallo el mapa', loadError)

    return (
        <GoogleMap
            zoom={15}
            center={center}
            onClick={mapClick}
            mapContainerClassName='map-styles'
        >
            {
                marker && <Marker
                    position={{
                        lat: marker.lat,
                        lng: marker.lng
                    }}
                />
            }
        </GoogleMap>
    )
}

export default Maps
