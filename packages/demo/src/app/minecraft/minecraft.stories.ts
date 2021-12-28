import { Meta, moduleMetadata } from '@storybook/angular';
import { MinecraftComponentModule } from './minecraft.component';
// @ts-ignore
import minecraftDocs from './minecraft.mdx';

export default {
  title: 'Examples/Minecraft',
  decorators: [
    moduleMetadata({
      imports: [MinecraftComponentModule],
    }),
  ],
  parameters: {
    docs: { page: minecraftDocs },
    viewMode: 'story',
  },
} as Meta;

export const Default = () => ({
  template: `
    <ngt-minecraft></ngt-minecraft>
  `,
});
