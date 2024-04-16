import { Container } from "@mui/material";
import CountdownText from "./CountdownText";
import { CountdownVideo } from "./CountdownVideo";

export function About(){
    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            
           <CountdownText />
          <CountdownVideo />
          {/* <MapView />  */}
        </Container>
      );
    
    }