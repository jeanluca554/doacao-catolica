import { ChooseHealthTracker } from "./components/chooseHealthTracker";
import { Header } from "./components/header";
import { HealthTrackerCard } from "./components/healthTrackerCard";
import { ListContainer } from "./components/listContainer";

import { Container } from "./styles";

function HealthTrackersPage() {
  return (
    <Container>
      <Header />

      <ListContainer>
        <HealthTrackerCard />
        <HealthTrackerCard />
        <HealthTrackerCard />
      </ListContainer>

      <ChooseHealthTracker />
    </Container>
  );
}

export { HealthTrackersPage };
