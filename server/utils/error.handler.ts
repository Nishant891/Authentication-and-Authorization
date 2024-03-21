interface CustomError extends Error {
  code?: number; // Optional property for error code
}

export const HandleError = (error: CustomError) => {
  if (error.code === 11000) {
    return {
        success: false,
        message: "User already exists"
    }
  }
  
  if(error.name === "ValidationError"){
    const parts = error.message.split(':');
    return{
        success: false,
        message: parts[2]
    };
  }

  if(error.name === "CustomError"){
    return{
      success: false,
      message: error.message
    }
  }
};
