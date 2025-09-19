import Sidebar from "@/widgets/sidebar/layout";

export default function Main() {
    return (
        <>
            <div id="container" className="w-[100vw] h-[100vh] bg-brand-bg">
                <Sidebar />
                <div id="content">
                    
                </div>
                <div id="sideContent">
                    
                </div>
            </div>
        </>
    );
}