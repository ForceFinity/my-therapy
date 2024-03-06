import { ResponseData } from "@core/api/http";

export default function processRequest<T>(
    req: Promise<ResponseData<T>>,
    respStoreFn: (value: any) => void,
    {errStoreFn, loadingStoreFn}: {
        errStoreFn?: (value: any) => void,
        loadingStoreFn?: (value: boolean) => void
    }
) {
    req
        .then(resp => {
            if(!resp.data) {
                errStoreFn && errStoreFn("Грешка при получаване на данни.")
                return
            }

            respStoreFn(resp.data)
        })
        .catch(() => {
            errStoreFn && errStoreFn("Грешка при получаване на данни.")
        })
        .finally(() => {
            loadingStoreFn && loadingStoreFn(false)
        })
}