import SambaClient from "samba-client";
import {IP_DATABASE, USER, PASSWORD} from "../config/config.json"

const smbConfig = new SambaClient({
    address: IP_DATABASE, // Caminho SMB
    username: USER,
    password: PASSWORD,
    domain: "WORKGROUP",
    maxProtocol: "SMB3", // Versão do protocolo
    maskCmd: true // Esconde credenciais nos logs
});
export default smbConfig