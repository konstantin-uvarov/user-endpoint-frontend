import { AppErrorToaster } from "../components/AppToaster";

export const handleErrors = async (request) => {
  try {
    const response = await request();
    return response;
  } catch (error) {
    const errorMessage =
      error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : "An error occurred";
    AppErrorToaster.show(errorMessage, { intent: "danger" });
    throw error;
  }
};
