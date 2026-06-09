import {
  Divider,
  IconButton,
  Input,
  Pagination,
  TableBody,
  TableContainer,
  TableHeader,
  Tooltip,
  useModal,
} from "@arkyn/components";
import { PencilLine, Search, Trash2 } from "lucide-react";
import { useLoaderData, useNavigate, useParams } from "react-router";

import { useEffect } from "react";
import { Avatar } from "~/client/components/avatar";
import { useFilter } from "~/client/hooks/useFilter";
import type { PatientsLoader } from "~/client/types/patientsLoader";
import {
  CaptionContainer,
  CentralizedTd,
  CentralizedTh,
  Container,
  FooterContainer,
} from "./styles";

function Table() {
  const { patients } = useLoaderData<PatientsLoader>();
  const { openModal } = useModal();

  const { workspaceId } = useParams();

  const navigate = useNavigate();

  if (!workspaceId) {
    throw new Error("Workspace ID is required");
  }

  const {
    handleChangeTimeoutFilter,
    handlePageChange,
    getParam,
    handleChangeFilter,
  } = useFilter("patients");

  useEffect(() => {
    handleChangeFilter("organizationId", workspaceId);
  }, [workspaceId]);

  return (
    <Container>
      <CaptionContainer>
        <Input
          name="name"
          label="Pesquisar:"
          rightIcon={Search}
          placeholder="Pesquisar por nome"
          defaultValue={getParam("name") || ""}
          onChange={(e) => handleChangeTimeoutFilter("name", e.target.value)}
        />
      </CaptionContainer>

      <TableContainer>
        <TableHeader>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Telefone</th>
          <CentralizedTh>Ações</CentralizedTh>
        </TableHeader>

        <TableBody>
          {patients.data.map((patient) => (
            <tr key={patient.id}>
              <td>
                <div className="avatarName">
                  <Avatar
                    avatar={patient.avatar || undefined}
                    name={patient.name}
                  />{" "}
                  {patient.name}
                </div>
              </td>
              <td>{patient.email}</td>
              <td>{patient.phone}</td>
              <CentralizedTd>
                <Tooltip text="Editar paciente">
                  <IconButton
                    size="sm"
                    aria-label="Editar paciente"
                    icon={PencilLine}
                    variant="invisible"
                    scheme="warning"
                    onClick={() => navigate(`${patient.id}`)}
                  />
                </Tooltip>
                <Tooltip text="Excluir paciente">
                  <IconButton
                    size="sm"
                    aria-label="Excluir paciente"
                    icon={Trash2}
                    variant="invisible"
                    scheme="danger"
                    onClick={() => openModal("delete-patient", patient)}
                  />
                </Tooltip>
              </CentralizedTd>
            </tr>
          ))}
        </TableBody>
      </TableContainer>

      <Divider />

      <FooterContainer>
        <p>
          Exibindo {patients.meta.page} de {patients.meta.totalPages} páginas
        </p>

        <Pagination
          currentPage={patients.meta.page}
          totalCountRegisters={patients.meta.totalItems}
          registerPerPage={patients.meta.pageLimit}
          onChange={handlePageChange}
        />
      </FooterContainer>
    </Container>
  );
}

export { Table };
