import Navbar from "./Navbar"
import { Poppins } from "next/font/google"

const poppins = Poppins({weight:"500",style:"normal",subsets:["latin"]})
export default function Layout({children}){
    return (
        <>
            <Navbar/>
            <main className={poppins.className} >{children}</main>
        </>
    )
}