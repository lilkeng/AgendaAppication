import { AgendaProjectPage } from './app.po';

describe('agenda-project App', () => {
  let page: AgendaProjectPage;

  beforeEach(() => {
    page = new AgendaProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
