import {
  Divider,
  IconButton,
  Pagination,
  TableBody,
  TableContainer,
  TableHeader,
  Tooltip,
  useModal,
} from "@arkyn/components";
import { PencilLine, Trash2 } from "lucide-react";
import { useLoaderData } from "react-router";

import { useFilter } from "~/client/hooks/useFilter";
import type { CollaboratorsLoader } from "~/client/types/collaboratorsLoader";
import { statusPendingInviteBadge } from "../../utilities/statusPendingInviteBadge";
import {
  CentralizedTd,
  CentralizedTh,
  Container,
  FooterContainer,
} from "./styles";

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

export { InvitesTable };
