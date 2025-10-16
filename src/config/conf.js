const backend_prod_url = import.meta.env.VITE_BACKEND_PROD_URL
const backend_dev_url = import.meta.env.VITE_BACKEND_DEV_URL

// export const backend_url = `${backend_dev_url}/api/barter/v1`
// export const backend_url_page = `${backend_dev_url}/api/page/v1`
// export const backend_url_media = `${backend_dev_url}/api/upload/v1`


export const backend_url = `${backend_prod_url}/api/barter/v1`
export const backend_url_page = `${backend_prod_url}/api/page/v1`
export const backend_url_media = `${backend_prod_url}/api/upload/v1`