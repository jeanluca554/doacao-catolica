import { styled } from "@linaria/react";
import { screenBreakpoints } from "~/client/themes/screenBreakpoints";

const PageContainer = styled.section`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  padding: 16px;

  margin: 0 auto;

  h1 {
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;

    color: var(--text-heading);
  }

  > p {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;

    color: var(--text-body);
    text-align: center;
  }
`;

const InviteCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  background-color: var(--card);

  padding: 20px;
  border-radius: 8px;
  min-width: 540px;

  margin-top: 32px;

  .workspaceName,
  .invitedBy {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .label {
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;

      color: var(--text-muted);
    }
  }

  .invitedBy,
  .inviteDate {
    .value {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;

      color: var(--text-body);
    }
  }

  .workspaceName {
    .value {
      font-size: 14px;
      font-weight: 600;
      line-height: 24px;

      color: var(--text-heading);
    }
  }

  .inviteDate {
    display: flex;
    align-items: end;
    justify-content: space-between;

    .info {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .label {
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;

        color: var(--text-muted);
      }
    }
  }

  .actions {
    display: flex;
    gap: 12px;
  }

  ${screenBreakpoints.xs} {
    width: calc(100vw - 32px);
    min-width: unset;
  }

  ${screenBreakpoints.xxs} {
    .inviteDate {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;

      .actions {
        width: 100%;
        flex-direction: column;
        gap: 12px;

        .arkynButton {
          width: 100%;
        }
      }
    }
  }
`;

export { PageContainer, InviteCard };
