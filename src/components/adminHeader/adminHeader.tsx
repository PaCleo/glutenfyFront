import { AdminFitHub, DivAdminFitHub, DivMain, Title } from "./adminHeaderStyles"

interface AdminHeaderProps {
    titulo: string;
  }

function AdminHeader( {titulo}: AdminHeaderProps ) {
    console.log("Renderizando AdminHeader com título:", titulo);

    return (
        <DivMain>
            <div>
                <Title>{titulo}</Title>
            </div>

            <DivAdminFitHub>
                <AdminFitHub>Admin FitHub</AdminFitHub>
            </DivAdminFitHub>
        </DivMain>
    )
}

export default AdminHeader;