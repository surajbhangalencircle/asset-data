
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Asset } from '../components/asset';



export const loadAssets = createAction(
  '[Assets] Load assets via Service',
);

export const assetsLoaded = createAction(
  '[assets Effect] assets Loaded Successfully',
  props<{asset: Asset[]}>()
);

export const assets0 = createAction(
    '[asset0 Effect] asset0 Loaded Successfully',
    props<{assetId: string}>()
  );

  export const assets1 = createAction(
    '[asset1 Effect] asset1 Loaded Successfully',
    props<{assetId: string}>()
  );

  export const assets2 = createAction(
    '[asset2 Effect] asset2 Loaded Successfully',
    props<{assetId: string}>()
  );

  export const assets3 = createAction(
    '[asset3 Effect] asset3 Loaded Successfully',
    props<{assetId: string}>()
  );

  export const assets4 = createAction(
    '[asset4 Effect] asset4 Loaded Successfully',
    props<{assetId: string}>()
  );


// export const createAsset = createAction(
//   '[CreateAsset] Create Asset',
//   props<{asset: Asset}>()
// );

// export const deleteAsset = createAction(
//   '[assets List Operations] Delete Asset',
//   props<{assetId: string}>()
// );

export const updateAsset = createAction(
  '[assets List Operations] Update Asset',
  props<{update: Update<Asset>}>()
);

export const employeeActionTypes = {
  loadAssets,
  assetsLoaded,
//   createAsset,
//   deleteAsset,
  updateAsset
};

