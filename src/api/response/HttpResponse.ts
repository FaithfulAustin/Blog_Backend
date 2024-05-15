class HttpResponse{
    constructor(public status:"success" | "error", public message:string,public data?:any){}
}

export default HttpResponse;  
