

export const ApiResponse = (success: boolean, data: object, error: object) => {

    if (success) {
        return {
            success: true,
            data: data
        }
    } else {
        return {
            success: false,
            errors: error
        }
    }

}