export const validate = (values: any) => {

    const errors: any = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.title) {
        errors.title = "title is required!";
    }

    if (!values.description) {
        errors.description = "description is required!";
    }



    if (!values.content) {
        errors.content = "content is required!";
    } else if (values.content.length < 10) {
        errors.content = "content must be more than 10 characters";
    }


    return errors;
};