import { toast } from "react-toastify"

export const ERRORS = {
    INVALID_EMAIL: "Please enter a valid email.",
    REQUIRED_FIELD: "Please fill all fields.",
    UNMATCHED_STRING: "Both passwords do not match.",
    INVALID_OTP: "Please enter a 4-digits valid otp."
}

export const isEmail = (email) => {

    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    let result = regex.test(email)

    if (!result) {
        toast.error(ERRORS.INVALID_EMAIL)
    }

    return result

}

export const compareString = (first, second) => {

    let matched = first === second

    if (!matched) {
        toast.error(ERRORS.UNMATCHED_STRING)
    }

    return matched

}

export const objectValidator = (object, message) => {

    if (object && Object.entries(object).length > 0) {

        let array = Object.entries(object).map(item => {
            if (!item[1] || item[1] === null || item[1] === undefined) {
                return false
            } else {
                return true
            }
        })

        let isNull = array.includes(false)

        if (isNull) {
            toast.error(message || ERRORS.REQUIRED_FIELD)
        }

        return !isNull

    }

    toast.error(message || ERRORS.REQUIRED_FIELD)
    return false

}

export const dateFormatter = (value) => {

    let date = new Date(value);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = '0' + month;
    }

    date = month + '-' + day + '-' + year;

    return date
}

export const formatTime = (value) => {
    const digits = value.replace(/\D/g, "");
    const formatted =
        digits.slice(0, 2) +
        (digits.length > 2 ? ":" + digits.slice(2, 4) : "") +
        (digits.length > 4 ? ":" + digits.slice(4, 6) : "");
    return formatted;
};