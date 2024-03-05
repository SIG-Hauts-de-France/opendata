import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { ImageInputComponent } from './image-input.component'
import { importProvidersFrom } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

export default {
  title: 'Inputs/ImageInputComponent',
  component: ImageInputComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
    }),
    moduleMetadata({
      imports: [ImageInputComponent],
    }),
  ],
} as Meta<ImageInputComponent>

export const WithoutImage: StoryObj<ImageInputComponent> = {
  args: {
    maxSizeMB: 5,
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 600px;height: 400px;">
      <gn-ui-image-input [maxSizeMB]="maxSizeMB">
      </gn-ui-image-input>
    </div>`,
  }),
}

export const WithImage: StoryObj<ImageInputComponent> = {
  args: {
    maxSizeMB: 5,
    previewUrl:
      'data:image/png;base64,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',
    altText: 'Some alternative text',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 600px;height: 400px;">
      <gn-ui-image-input
        [maxSizeMB]="maxSizeMB"
        [previewUrl]="previewUrl"
        [altText]="altText"
      ></gn-ui-image-input>
    </div>`,
  }),
}

export const WithBrokenImage: StoryObj<ImageInputComponent> = {
  args: {
    maxSizeMB: 5,
    previewUrl: 'https://broken/url',
    altText: 'Some alternative text',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 600px;height: 400px;">
      <gn-ui-image-input
        [maxSizeMB]="maxSizeMB"
        [previewUrl]="previewUrl"
        [altText]="altText"
      ></gn-ui-image-input>
    </div>`,
  }),
}

export const UploadProgress5: StoryObj<ImageInputComponent> = {
  args: {
    maxSizeMB: 5,
    uploadProgress: 5,
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 600px;height: 400px;">
      <gn-ui-image-input
        [maxSizeMB]="maxSizeMB"
        [uploadProgress]="uploadProgress"
      ></gn-ui-image-input>
    </div>`,
  }),
}

export const UploadProgress95: StoryObj<ImageInputComponent> = {
  args: {
    maxSizeMB: 5,
    uploadProgress: 95,
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 600px;height: 400px;">
      <gn-ui-image-input
        [maxSizeMB]="maxSizeMB"
        [uploadProgress]="uploadProgress"
      ></gn-ui-image-input>
    </div>`,
  }),
}

export const UploadError: StoryObj<ImageInputComponent> = {
  args: {
    maxSizeMB: 5,
    uploadError: true,
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 600px;height: 400px;">
      <gn-ui-image-input
        [maxSizeMB]="maxSizeMB"
        [uploadError]="uploadError"
      ></gn-ui-image-input>
    </div>`,
  }),
}
