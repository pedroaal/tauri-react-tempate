import useLoaderStore from "~/store/loaderStore"
import useAlertStore from "~/store/alertStore"

interface IOptions {
  successTitle?: string
  successDescription?: string
  errorTitle?: string
  errorDescription?: string
}

export const useQuery = async <T>(
  callback: () => Promise<T>,
  options: IOptions,
): Promise<T> => {
  const addLoader = useLoaderStore.getState().addLoader
  const removeLoader = useLoaderStore.getState().removeLoader
  const addAlert = useAlertStore.getState().addAlert
  const key = getUUID()

  addLoader(key)

  try {
    const result = (await callback()) as T
    addAlert({
      id: key,
      type: "success",
      title: options.successTitle ?? "Success",
      description: options.successDescription,
    })
    return result
  } catch (error) {
    const description =
      options.errorDescription ??
      error.message ??
      "An unexpected error occurred"

    addAlert({
      id: key,
      type: "error",
      title: options.errorTitle ?? "Error",
      description,
    })

    throw error
  } finally {
    removeLoader(key)
  }
}
