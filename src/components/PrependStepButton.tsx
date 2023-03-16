import { Popover, Tooltip } from '@patternfly/react-core';
import { PlusIcon } from '@patternfly/react-icons';
import { FunctionComponent } from 'react';
import { ValidationService } from '@kaoto/services';
import { useSettingsStore } from '@kaoto/store';
import { IStepProps } from '@kaoto/types';
import { MiniCatalog } from './MiniCatalog';

interface IPrependStepButton {
  onMiniCatalogClickPrepend: (selectedStep: IStepProps) => void;
  layout: string;
  step: IStepProps;
}

export const PrependStepButton: FunctionComponent<IPrependStepButton> = ({
  onMiniCatalogClickPrepend,
  layout,
  step,
}) => {
  const currentDSL = useSettingsStore((state) => state.settings.dsl.name);

  return (
    <Popover
      id="popover-prepend-step"
      aria-label="Add a step"
      bodyContent={
        <MiniCatalog
          disableBranchesTab={true}
          disableBranchesTabMsg="You can't add a branch from here."
          disableStepsTab={false}
          handleSelectStep={onMiniCatalogClickPrepend}
          queryParams={{
            dsl: currentDSL,
            type: ValidationService.prependableStepTypes(),
          }}
          step={step}
        />
      }
      className="miniCatalog__popover"
      data-testid="miniCatalog__popover"
      enableFlip={true}
      flipBehavior={['top-start', 'left-start']}
      hasAutoWidth
      hideOnOutsideClick={true}
      position="left-start"
      showClose={false}
    >
      <Tooltip
        content="Add a step"
        position={layout === 'LR' ? 'top' : 'right'}
      >
        <button
          className={`${layout === 'LR'
            ? 'stepNode__Prepend'
            : 'stepNode__Prepend--vertical'
            } plusButton nodrag`}
          data-testid="stepNode__prependStep-btn"
        >
          <PlusIcon />
        </button>
      </Tooltip>
    </Popover>
  )
};