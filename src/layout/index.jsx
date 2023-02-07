import React, { Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Loader } from "components";

const Layout = (props) => {
    const { children } = props;
    console.log('layout')
    return <>
        <div>
            <Header />
            <div>
                <Suspense fallback={<Loader />}>
                    {children}
                </Suspense>
            </div>
            <Footer />
        </div>
    </>
}
export default Layout