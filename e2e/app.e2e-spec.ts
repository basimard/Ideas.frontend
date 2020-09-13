import { IdeasTemplatePage } from './app.po';

describe('Ideas App', function() {
  let page: IdeasTemplatePage;

  beforeEach(() => {
    page = new IdeasTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
