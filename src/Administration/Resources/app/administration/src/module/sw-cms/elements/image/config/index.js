import template from './sw-cms-el-config-image.html.twig';
import './sw-cms-el-config-image.scss';

const { Mixin } = Shopware;

/**
 * @private
 * @package discovery
 */
export default {
    template,

    compatConfig: Shopware.compatConfig,

    inject: ['repositoryFactory'],

    emits: ['element-update'],

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    data() {
        return {
            mediaModalIsOpen: false,
            initialFolderId: null,
        };
    },

    computed: {
        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        uploadTag() {
            return `cms-element-media-config-${this.element.id}`;
        },

        previewSource() {
            if (this.element?.data?.media?.id) {
                return this.element.data.media;
            }

            return this.element.config.media.value;
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('image');
        },

        async onImageUpload({ targetId }) {
            const mediaEntity = await this.mediaRepository.get(targetId);

            this.element.config.media.value = mediaEntity.id;
            this.element.config.media.source = 'static';

            this.updateElementData(mediaEntity);

            this.$emit('element-update', this.element);
        },

        onImageRemove() {
            this.element.config.media.value = null;

            this.updateElementData();

            this.$emit('element-update', this.element);
        },

        onCloseModal() {
            this.mediaModalIsOpen = false;
        },

        onSelectionChanges(mediaEntity) {
            const media = mediaEntity[0];
            this.element.config.media.value = media.id;
            this.element.config.media.source = 'static';

            this.updateElementData(media);

            this.$emit('element-update', this.element);
        },

        updateElementData(media = null) {
            const mediaId = media === null ? null : media.id;
            if (!this.element.data) {
                if (this.isCompatEnabled('INSTANCE_SET')) {
                    this.$set(this.element, 'data', { mediaId, media });
                } else {
                    this.element.data = { mediaId, media };
                }

                return;
            }

            if (this.isCompatEnabled('INSTANCE_SET')) {
                this.$set(this.element.data, 'mediaId', mediaId);
                this.$set(this.element.data, 'media', media);
            } else {
                this.element.data.mediaId = mediaId;
                this.element.data.media = media;
            }
        },

        onOpenMediaModal() {
            this.mediaModalIsOpen = true;
        },

        onChangeMinHeight(value) {
            this.element.config.minHeight.value = value === null ? '' : value;

            this.$emit('element-update', this.element);
        },

        onChangeDisplayMode() {
            this.$emit('element-update', this.element);
        },

        onChangeIsDecorative(value) {
            this.element.config.isDecorative.value = value;

            this.$emit('element-update', this.element);
        },
    },
};
