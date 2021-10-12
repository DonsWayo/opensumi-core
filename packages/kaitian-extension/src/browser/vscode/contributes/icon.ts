import { Injectable, Autowired } from '@ali/common-di';
import { ThemeContribution, IIconService } from '@ali/ide-theme';
import { URI } from '@ali/ide-core-common';
import { VSCodeContributePoint, Contributes } from '../../../common';

export type ThemesSchema = Array<ThemeContribution>;

@Injectable()
@Contributes('iconThemes')
export class IconThemesContributionPoint extends VSCodeContributePoint<ThemesSchema> {
  @Autowired(IIconService)
  private readonly iconService: IIconService;

  contribute() {
    const themes = this.json.map((t) => ({
      ...t,
      label: this.getLocalizeFromNlsJSON(t.label),
    }));
    this.iconService.registerIconThemes(themes, URI.from(this.extension.uri!));
  }
}
