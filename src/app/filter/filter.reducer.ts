import * as fromFiltro from './filter.actions';

const ESTADO_INICIAL: fromFiltro.filtrosValidos = 'todos';

export function filtroReducer(state = ESTADO_INICIAL, action: fromFiltro.acciones): fromFiltro.filtrosValidos {
    switch (action.type) {
        case fromFiltro.SET_FILTRO:
            return action.filtro;
        default:
            return state;
    }
}
