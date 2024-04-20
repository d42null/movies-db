import { Container } from "@mui/material";
import CountdownText from "./CountdownText";
import { CountdownVideo } from "./CountdownVideo";
import { MapView } from "./MapView";

export default function About(){
    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            
           <CountdownText />
          <CountdownVideo />
          <MapView /> 
        </Container>
      );
    
    }