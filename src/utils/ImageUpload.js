export const checkImage = (file) => {
    let err = ""
    if(!file) return err = "File does not exist."

    if(file.size > 1024 * 1024)
        err = "The largest image size is 1mb."

    if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg')
        err = "Image format is incorrect."

    return err;
}


export const imageUpload = async (images) => {
    let imgArr = [];
    for(const item of images){
        const formData = new FormData()

        if(item.camera){
            formData.append("image", item.camera)
        }else{
            formData.append("image", item)
        }

        formData.append("upload_preset", "efxjficn")
        formData.append("cloud_name", "gitca")

        const res = await fetch("https://api.cloudinary.com/v1_1/ruben/upload", {
            method: "POST",
            body: formData
        })

        const data = await res.json()
        imgArr.push({public_id: data.public_id, url: data.secure_url})
    }
    return imgArr;
}
