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
import { useLoaderData } from "react-router";

import { useFilter } from "~/client/hooks/useFilter";
import type { CollaboratorsLoader } from "~/client/types/collaboratorsLoader";
import { statusBadge } from "../../utilities/statusBadge";
import { statusPendingInviteBadge } from "../../utilities/statusPendingInviteBadge";
import {
  CaptionContainer,
  CentralizedTd,
  CentralizedTh,
  Container,
  FooterContainer,
} from "./styles";

function CollaboratorsTable() {
  const { collaborators } = useLoaderData<CollaboratorsLoader>();
  const { openModal } = useModal();

  const { handleChangeTimeoutFilter, handlePageChange, getParam } =
    useFilter("collaborators");

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
          <th>Função</th>
          <th>Área de atuação</th>
          <th>Status</th>
          <CentralizedTh>Ações</CentralizedTh>
        </TableHeader>

        <TableBody>
          {collaborators.data.map((collaborator) => (
            <tr key={collaborator.id}>
              <td>{collaborator.name}</td>
              <td>{collaborator.email}</td>
              <td>{collaborator.roleName}</td>
              <td>{collaborator.specialtyName}</td>
              <td>{statusBadge(collaborator.active)}</td>
              <CentralizedTd>
                <Tooltip text="Editar colaborador">
                  <IconButton
                    size="sm"
                    aria-label="Editar colaborador"
                    icon={PencilLine}
                    variant="invisible"
                    scheme="warning"
                    onClick={() =>
                      openModal("update-collaborator", collaborator)
                    }
                  />
                </Tooltip>
                <Tooltip text="Excluir colaborador">
                  <IconButton
                    size="sm"
                    aria-label="Excluir colaborador"
                    icon={Trash2}
                    variant="invisible"
                    scheme="danger"
                    onClick={() =>
                      openModal("delete-collaborator", collaborator)
                    }
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
          Exibindo {collaborators.meta.page} de {collaborators.meta.totalPages}{" "}
          páginas
        </p>

        <Pagination
          currentPage={collaborators.meta.page}
          totalCountRegisters={collaborators.meta.totalItems}
          registerPerPage={collaborators.meta.pageLimit}
          onChange={handlePageChange}
        />
      </FooterContainer>
    </Container>
  );
}

function InvitesTable() {
  const { invites, roles } = useLoaderData<CollaboratorsLoader>();
  const { openModal } = useModal();

  const { handlePageChange } = useFilter("invites");

  return (
    <Container>
      <TableContainer>
        <TableHeader>
          <th>E-mail</th>
          <th>Função</th>
          <th>Status</th>
          <CentralizedTh>Ações</CentralizedTh>
        </TableHeader>

        <TableBody>
          {invites.data.map((invite) => (
            <tr key={invite.id}>
              <td>{invite.email}</td>
              <td>
                {roles.find((r) => r.id === invite.roleId)?.name ||
                  "Função não encontrada"}
              </td>
              <td>{statusPendingInviteBadge({ text: invite.status })}</td>
              <CentralizedTd>
                {invite.status !== "REJECTED" && (
                  <>
                    <Tooltip text="Editar convite pendente">
                      <IconButton
                        aria-label="Atualizar proprietário"
                        icon={PencilLine}
                        variant="invisible"
                        scheme="warning"
                        size="sm"
                        onClick={() => openModal("update-invite", invite)}
                      />
                    </Tooltip>
                    <Tooltip text="Excluir convite pendente">
                      <IconButton
                        aria-label="Excluir proprietário"
                        icon={Trash2}
                        variant="invisible"
                        scheme="danger"
                        size="sm"
                        onClick={() => openModal("delete-invite", invite)}
                      />
                    </Tooltip>
                  </>
                )}
              </CentralizedTd>
            </tr>
          ))}
        </TableBody>
      </TableContainer>

      <Divider />

      <FooterContainer>
        <p>
          Exibindo {invites.meta.page} de {invites.meta.totalPages} páginas
        </p>

        <Pagination
          currentPage={invites.meta.page}
          totalCountRegisters={invites.meta.totalItems}
          registerPerPage={invites.meta.pageLimit}
          onChange={handlePageChange}
        />
      </FooterContainer>
    </Container>
  );
}

export { CollaboratorsTable, InvitesTable };
