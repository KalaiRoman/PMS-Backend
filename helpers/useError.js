import STATUS_CODES from "../constant/httpStatusCodes.constant.js";

const useError = (res, statusCode,message) => {
  const findMessage=STATUS_CODES?.find((item,index)=>item?.code==statusCode);
  return res.status(statusCode).json({ message:message?message:findMessage?.message, status: false,statusCode:statusCode });
};
export { useError };
