/* eslint-disable react/no-unstable-nested-components */
import { useRef, useState } from 'react';
import { Button, Form, Layout, Popover, Skeleton, Spin, Tabs } from 'antd';
import { useParams, useSearchParams } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { StarsSVG } from '#/assets/svg';
import CreateDocumentHeader from '#/containers/Compliances/Documents/components/CreateDocumentHeader';
import DocumentLinkedControl from '#/containers/Compliances/Documents/components/DocumentLinkedControl';
import EditUploadDocument from '#/containers/Compliances/Documents/components/EditUploadDocument';
import LinkedTasks from '#/containers/Compliances/Documents/components/LinkedTasks';
import { CreateFormTabKey } from '#/containers/Compliances/Documents/constants/documents';
import CreateDocument from '#/containers/Compliances/Documents/CreateDocument';
import useDocumentPermission from '#/containers/Compliances/Documents/hooks/useDocumentPermission';
import useFormBuilderTabs from '#/containers/Compliances/Documents/hooks/useFormBuilderTabs';
import type {
  DocumentEditorTabsRef,
  DocumentUploaderRef,
} from '#/containers/Compliances/Documents/interfaces/document.types';
import type { DraggableField } from '#/containers/Compliances/Documents/interfaces/draggableFields.types';
import type { CreateDocumentFormValues } from '#/containers/Compliances/Documents/interfaces/form.types';
import { renderDocumentTabBar } from '#/containers/Compliances/Documents/utils/documents';
import ViewTaskDrawer from '#/containers/OutstandingTasks/components/modals/ViewTaskDrawer';
import type {
  DocumentFragment,
  DraftLinkedTaskFragment,
} from '#/generated/schemas';
import {
  DocumentStatus,
  IsoStandard,
  useGetDocumentQuery,
  useGetDocumentTemplateQuery,
} from '#/generated/schemas';
import ColorfulButton from '#/shared/components/buttons/ColorfulButton';
import ConditionalWrapper from '#/shared/components/wrappers/ConditionalWrapper';
import { VisibilityValue } from '#/shared/constants/select';
import { LOCAL_STORAGE_DOCUMENT_AI_CONVERT_GUIDE } from '#/shared/constants/storage-key';
import useAIConversionTour from '#/shared/hooks/useAIConversionTour';
import FormPreviewerContainer from '../FormPreviewerContainer';

interface Props {
  isEdit?: boolean;
}

function FormBuilderLayout({ isEdit }: Props) {
  const uploaderRef = useRef<DocumentUploaderRef | null>(null);
  const convertBtnRef = useRef<HTMLElement | null>(null);
  const tabsRef = useRef<DocumentEditorTabsRef | null>(null);
  const { tour, forceDisableUploadBtn, showGuidance } = useAIConversionTour({
    convertBtnRef,
    convertGuideStorageKey: LOCAL_STORAGE_DOCUMENT_AI_CONVERT_GUIDE,
    tabsRef,
    type: 'document',
    uploaderRef,
  });
  const { hasPermissionOnLinkedTasks } = useDocumentPermission();
  const { id } = useParams<{ id: string }>();
  const { currentActiveKey, onChangeTab } = useFormBuilderTabs();
  const [selectedTasks, setSelectedTasks] = useState<DraftLinkedTaskFragment[]>(
    [],
  );
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('templateId');
  const [data, updateData] = useImmer<{ fields: DraggableField[] }>({
    fields: [],
  });

  const onShowGuidance = () => {
    onChangeTab(CreateFormTabKey.Upload);
    showGuidance();
  };

  const { loading: isLoadingTemplate } = useGetDocumentTemplateQuery({
    onCompleted: data => {
      updateData(draft => {
        draft.fields = data.getDocumentTemplate
          .htmlTemplate as DraggableField[];
      });

      form.setFieldsValue({
        category: data.getDocumentTemplate.category ?? [],
        departmentIds: [],
        industry: data.getDocumentTemplate.industry ?? undefined,
        isoStandards: data.getDocumentTemplate.isoStandards,
        name: data.getDocumentTemplate.name,
        type: data.getDocumentTemplate.type,
      });
    },
    skip: isEdit || !!id || !templateId,
    variables: {
      getDocumentTemplateId: templateId || '',
    },
  });

  const { loading: isLoadingDocument, data: documentData } =
    useGetDocumentQuery({
      fetchPolicy: 'network-only',
      onCompleted: data => {
        updateData(draft => {
          draft.fields = data.getDocument.htmlTemplate as DraggableField[];
        });

        setSelectedTasks(
          data.getDocument.draftLinkedTask?.map(item => {
            if (!item.code) {
              return {
                ...item,
                id: item.name,
              };
            }

            return item;
          }) as DraftLinkedTaskFragment[],
        );

        form.setFieldsValue({
          category: data.getDocument.category ?? [],
          controlIds: data.getDocument.controls?.map(item => item.id),
          departmentIds: data.getDocument.departments?.map(item => item.id),
          industry: data.getDocument.industry ?? undefined,
          isRestriction: data.getDocument.isRestriction
            ? VisibilityValue.Restricted
            : VisibilityValue.Global,
          isoStandards: data.getDocument.isoStandards,
          name: data.getDocument.name,
          type: data.getDocument.type,
        });
      },
      skip: !id || !isEdit,
      variables: {
        id: id || '',
      },
    });

  const TabsItems = [
    {
      children: (
        <EditUploadDocument
          convertBtnRef={convertBtnRef}
          forceDisableUploadBtn={forceDisableUploadBtn}
          formHasValue={!!data.fields.length}
          updateData={updateData}
          uploaderRef={uploaderRef}
        />
      ),
      forceRender: true,
      key: CreateFormTabKey.Upload,
      label: (
        <div
          className="flex items-center gap-1"
          ref={ref => {
            tabsRef.current = {
              fileUploadEl: ref,
            };
          }}
        >
          File Upload
          <Popover
            autoAdjustOverflow={false}
            content={
              <div className="flex justify-end">
                <Button
                  className="py-0 text-sm"
                  onClick={onShowGuidance}
                  size="small"
                  type="link"
                >
                  Show guidance
                </Button>
              </div>
            }
            placement="top"
            title={
              <div className="text-center text-sm">Feature with AI support</div>
            }
          >
            <ColorfulButton className="text-xs gap-1 rounded-lg" size="small">
              AI
              <StarsSVG className="text-white" width={12} />
            </ColorfulButton>
          </Popover>
        </div>
      ),
    },
    {
      children: <CreateDocument data={data} updateData={updateData} />,
      forceRender: true,
      key: CreateFormTabKey.Edit,
      label: 'Edit Document',
    },
    {
      children: (
        <div className="bg-document bg-opacity-15 bg-repeat-round">
          <FormPreviewerContainer forms={data.fields} />
        </div>
      ),
      key: CreateFormTabKey.Preview,
      label: 'Document preview',
    },
    ...(documentData?.getDocument.status !== DocumentStatus.Publish &&
    !documentData?.getDocument.archivedAt
      ? [
          {
            children: (
              <LinkedTasks
                documentStatus={documentData?.getDocument.status}
                inititalLinkedDocument={
                  documentData?.getDocument as DocumentFragment
                }
                isView={!hasPermissionOnLinkedTasks}
                selectedTasks={selectedTasks}
                setSelectedTasks={setSelectedTasks}
              />
            ),
            key: CreateFormTabKey.LinkedTasks,
            label: 'Linked tasks',
          },
        ]
      : []),
    {
      children: (
        <ConditionalWrapper
          condition={isLoadingDocument}
          wrapper={children => <Spin>{children}</Spin>}
        >
          <DocumentLinkedControl
            isArchived={!!documentData?.getDocument.archivedAt}
            isCreate
            linkedControls={documentData?.getDocument.controls}
          />
        </ConditionalWrapper>
      ),
      forceRender: true,
      key: CreateFormTabKey.LinkedControls,
      label: 'Linked controls',
    },
  ];

  return (
    <>
      <Layout>
        <Form<CreateDocumentFormValues>
          form={form}
          initialValues={{
            isSelectedAllDocuments: false,
            isoStandards: [IsoStandard.Iso_9001],
            name: 'Untitled',
          }}
          layout="vertical"
          name="addDocument"
        >
          <Layout.Header className="bg-white px-5 min-h-[80px]">
            <CreateDocumentHeader
              currentVersion={documentData?.getDocument.version}
              documentStatus={
                documentData?.getDocument.status ?? DocumentStatus.Draft
              }
              fields={data.fields}
              initialDocumentValues={
                documentData?.getDocument as DocumentFragment
              }
              initialRepublishFormValues={{
                descriptionOfChange:
                  documentData?.getDocument.descriptionOfChange ?? '',
                levelOfChange:
                  documentData?.getDocument.levelOfChange ?? undefined,
              }}
              isEdit={isEdit}
              isLoading={isLoadingDocument || isLoadingTemplate}
              selectedTasks={selectedTasks}
              setSelectedTasks={setSelectedTasks}
            />
          </Layout.Header>
          <Layout.Content className="bg-slate-100 h-screen">
            {isLoadingDocument || isLoadingTemplate ? (
              <Skeleton />
            ) : (
              <Tabs
                activeKey={currentActiveKey}
                centered
                className="bg-slate-100"
                defaultActiveKey={CreateFormTabKey.Edit}
                items={TabsItems}
                onChange={key => onChangeTab(key as CreateFormTabKey)}
                renderTabBar={renderDocumentTabBar}
              />
            )}
          </Layout.Content>
        </Form>
      </Layout>
      <ViewTaskDrawer />
      {tour}
    </>
  );
}

export default FormBuilderLayout;
