// import fetch from "isomorphic-fetch";
// require("es6-promise").polyfill();
import Cookies from "js-cookie";
// handle abortion
// let prevGetController: any = null;
class BaseService {
    static getHeaders = (isFile?: boolean) => {
        let headers = new Headers();
        if (!isFile) {
            headers.append("Content-Type", "application/json");
        }
        headers.append("Accept", "application/json");
        headers.append("Access-Control-Allow-Origin", " * ");
        headers.append("Credentials", "same-origin");
        headers.append(
            "Accept-Language",
            `${Cookies.get("language") || "fr-FR"};q=0.9`
        );
        return headers;
    };
    static getHeadersAuth = (isFile?: boolean) => {
        let headers = BaseService.getHeaders(isFile);
        let access_token = Cookies.get("token")
            ? Cookies.get("token")?.toString()
            : null;

        if (access_token === null) {
            // window.location.reload();
        }
        headers.append("Authorization", `Bearer ${access_token}`);
        return headers;
    };
    static postRequest = async (
        url: string,
        body: any,
        required_auth: boolean
    ) => {
        let head = required_auth
            ? BaseService.getHeadersAuth()
            : BaseService.getHeaders();
        let headers: any = {
            method: "POST",
            headers: head,
            mode: "cors",
            cache: "default",
            body: JSON.stringify(body)
        };
        let response = await fetch(url, headers)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            });
        return response;
    };
    static postFileRequest = async (
        url: string,
        body: any,
        required_auth: boolean
    ) => {
        let head = required_auth
            ? BaseService.getHeadersAuth(true)
            : BaseService.getHeaders(true);
        let headers: any = {
            method: "POST",
            headers: head,
            mode: "cors",
            cache: "default",
            body: body
        };
        let response = await fetch(url, headers)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            });
        return response;
    };
    static putFileRequest = async (
        url: string,
        body: any,
        required_auth: boolean
    ) => {
        let head = required_auth
            ? BaseService.getHeadersAuth(true)
            : BaseService.getHeaders(true);
        let headers: any = {
            method: "PUT",
            headers: head,
            mode: "cors",
            cache: "default",
            body: body
        };
        return await fetch(url, headers)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            });
    };
    static putRequest = async (
        url: string,
        body: any,
        required_auth: boolean
    ) => {
        let head = required_auth
            ? BaseService.getHeadersAuth()
            : BaseService.getHeaders();
        let headers: any = {
            method: "PUT",
            headers: head,
            mode: "cors",
            cache: "default",
            body: JSON.stringify(body)
        };
        let response = await fetch(url, headers)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            });
        return response;
    };
    static deleteRequest = async (
        url: string,
        body: any,
        required_auth: boolean
    ) => {
        let head = required_auth
            ? BaseService.getHeadersAuth()
            : BaseService.getHeaders();
        let headers: any = {
            method: "DELETE",
            headers: head,
            mode: "cors",
            cache: "default",
            body: JSON.stringify(body)
        };
        let response = await fetch(url, headers)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            });
        return response;
    };
    static getRequest = async (
        url: string,
        required_auth = false,
        abort = false
    ) => {
        // const controller = new AbortController();
        // const { signal } = controller;
        let head = required_auth
            ? BaseService.getHeadersAuth()
            : BaseService.getHeaders();
        let headers: any = {
            method: "GET",
            headers: head,
            mode: "cors",
            cache: "default"
            // signal,
        };
        // if (abort) prevGetController.abort();
        // prevGetController = controller;
        let response = await fetch(url, headers)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            });
        return response;
    };
    static getServerRequest = async (
        url: string,
        required_auth = false,
        abort = false
    ) => {
        // const controller = new AbortController();
        // const { signal } = controller;
        let head = required_auth
            ? BaseService.getHeadersAuth()
            : BaseService.getHeaders();
        let headers: any = {
            method: "GET",
            headers: head,
            mode: "cors",
            cache: "default"
            // signal,
        };
        // if (abort) prevGetController.abort();
        // prevGetController = controller;
        return await fetch(url, headers)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                return err;
            });
    };
}

export default BaseService;
