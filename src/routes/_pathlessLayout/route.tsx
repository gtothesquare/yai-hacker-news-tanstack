import { Outlet, createFileRoute } from '@tanstack/react-router';
import { Header } from '~/components/layouts/Header';
import { Footer } from '~/components/layouts/Footer';
import { Container } from '~/components/ui/Container';

export const Route = createFileRoute('/_pathlessLayout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
