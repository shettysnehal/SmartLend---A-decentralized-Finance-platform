import React from 'react';
import web3 from '@/etherum/web3';
import {
    CardMeta,
    CardHeader,
    CardGroup,
    CardDescription,
    CardContent,
    Card,
    GridRow,
    GridColumn,
    Button,
    Divider,
    Grid,
    Header,
    Icon,
    Search,
    Segment,
    Container,
    Input
  
} from 'semantic-ui-react'

export default function Index() {
    const connect = async()=>{
        await web3.eth.getAccounts(function (error, result) {
            console.log("result")
        });
    }
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>

            <div style={{
                height: "100vh",
                width: "100vw",
                position: "relative",
                overflow: "hidden"
            }}>
                <div style={{
                    backgroundImage: 'url("/template.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom',
                   
                    backgroundRepeat: 'no-repeat',
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    top: 0,
                    bottom:"50px",
                    left: 0,
                    display: "flex",
                   
                    alignItems: "flex-start",
                    flexDirection: "column",
                    paddingLeft:"35px",
                    
                }}>
                    <h1 style={{
                        color: "white",
                        fontFamily: "Montserrat",
                        fontOpticalSizing: "auto",
                        fontWeight: "400",
                        fontStyle: "normal",
                        textAlign: "left",
                        fontSize:"70px",
                        marginTop:"60px"
                       
                        
                    }}>SmartLend <br /> Embrace the Future</h1>
                </div>
               <div> <Segment style={{paddingLeft:"120px",marginTop:"300px",width:"120px",background: "rgba(0,0,0,0)"}} inverted>
                <Button style={{width:"120px",height:"50px",fontSize:"17px"}} inverted onClick={connect}>Launch</Button></Segment></div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", height: "100vh", width: "100vw", padding: "10px" }}>
                <div style={{ flex: 1, color: "black", padding: "20px" }}>
                    <h1 style={{ fontSize: "2rem" }}>
                        Embrace the future of finance with DeFi: transparent, decentralized, and empowering everyone to be their own bank.
                    </h1>
                </div>
                <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img src="/path-to-your-image.jpg" alt="DeFi Image" style={{ maxWidth: "100%", height: "auto" }} />
                </div>
            </div>

            <div style={{ height: "100vh", width: "80wh",backgroundColor:"#071930" }}>
                <CardGroup style={{ display: 'flex', gap: "60px", marginLeft: "200px", overflowX: 'auto', scrollBehavior: 'smooth' }}>
    <Card style={{ 
        flex: '0 0 20%', 
        margin: '10px', 
        height: "250px", 
        backgroundColor: '#333', 
        color: '#fff', 
        transition: 'transform 0.3s', 
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} >
        <CardContent>
            <CardHeader style={{ color: '#fff' }}>p2p</CardHeader>
            <CardMeta style={{ color: '#ccc' }}>Co-Worker</CardMeta>
            <CardDescription>
                Matthew is a pianist living in Nashville.
            </CardDescription>
        </CardContent>
    </Card>

    <Card style={{ 
        flex: '0 0 20%', 
        margin: '10px', 
        backgroundColor: '#333', 
        color: '#fff', 
        transition: 'transform 0.3s', 
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} >
        <CardContent>
            <CardHeader content='Jake Smith' style={{ color: '#fff' }} />
            <CardMeta content='Musicians' style={{ color: '#ccc' }} />
            <CardDescription content='Jake is a drummer living in New York.' />
        </CardContent>
    </Card>

    <Card style={{ 
        flex: '0 0 20%', 
        margin: '10px', 
        backgroundColor: '#333', 
        color: '#fff', 
        transition: 'transform 0.3s', 
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} >
        <CardContent
            header='Elliot Baker'
            meta='Friend'
            description='Elliot is a music producer living in Chicago.'
            style={{ color: '#fff' }}
        />
    </Card>
</CardGroup>

<CardGroup style={{ display: 'flex', gap: "60px", marginTop: '70px', marginLeft: "400px", overflowX: 'auto', scrollBehavior: 'smooth' }}>
    <Card style={{ 
        flex: '0 0 25%', 
        margin: '10px', 
        height: "250px", 
        backgroundColor: '#333', 
        color: '#fff', 
        transition: 'transform 0.3s', 
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} >
        <CardContent>
            <CardHeader style={{ color: '#fff' }}>Jenny Hess</CardHeader>
            <CardMeta style={{ color: '#ccc' }}>Friend</CardMeta>
            <CardDescription>
                Jenny is a student studying Media Management at the New School
            </CardDescription>
        </CardContent>
    </Card>

    <Card style={{ 
        flex: '0 0 25%', 
        margin: '10px', 
        backgroundColor: '#333', 
        color: '#fff', 
        transition: 'transform 0.3s', 
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} >
        <CardContent>
            <CardHeader style={{ color: '#fff' }}>Steve Jobs</CardHeader>
            <CardMeta style={{ color: '#ccc' }}>Colleague</CardMeta>
            <CardDescription>
                Steve is a software engineer living in San Francisco.
            </CardDescription>
        </CardContent>
    </Card>
</CardGroup>

            </div>
           
            <hr />




        </>
    );
}
