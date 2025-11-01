import { SquareClient } from "square";
const SQUARE_ACCESS_TOKEN="EAAAED0c7skUBbt2MT25KLFdEFaBIeXFnMl5lv4tNxJaR-3Zaa3q11eJHDxf_PNO"

const client = new SquareClient({
    token: SQUARE_ACCESS_TOKEN,
});
  
export default client;