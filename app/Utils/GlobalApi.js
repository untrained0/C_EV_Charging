import axios from "axios";
import secret_keys from "../../secret_keys";

const BASE_URL = "https://places.googleapis.com/v1/places:searchNearby";
const API_KEY = secret_keys.API_KEY;

const config = {
    headers : {
        'Content-Type': 'application/json',
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": ['places.displayName',
        'places.formattedAddress',
        'places.location',
        'places.evChargeOptions',
        'places.photos',
        'places.shortFormattedAddress',
        'places.id'
        ]
    }
}

const NewNearByPlaces = (data) => axios.post(BASE_URL, data, config);

export default{
    NewNearByPlaces
}