import axios from "axios";

// se establece la url del backend a la cual se le van a hacer peticiones
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});


// a todas las peticiones se les va a cargar el token. Si no existe, va a ser null
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// en todas las respuestas, si es correcta, retorno dicha respuesta, pero si hubo un error, se toma el response de ese
// error, y si el estado es 401 remuevo el token de localStorage. Si no era 401, simplemente ejecuto un Error con dicho error
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response.status === 401) {
            localStorage.removeItem("ACCESS_TOKEN");
        }

        throw error;
    }
);

export default axiosClient;
