import React, {Component} from 'react';
import lien from '../../images/lien_logo.svg'

export default class Fragment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idTextToAnalyse: null
        };
        this.setState.bind();
    }

    static getDerivedStateFromProps(nextProps, nextState) {
        if (nextState.idTextToAnalyse) {
            let found = nextProps.items.find((text) => text.id === nextState.idTextToAnalyse);
            if (!found) return {idTextToAnalyse: null}
        }
        return false
    }

    render() {
        const generatedTextDescription = this._generateTextDescription();
        const generatedTextFragment = this._generateTextFragment();
        const generateLink = this._generateLink();
        return (
            <div className="d-table w-100 border">
                <div className="d-table-row border">
                    <div className="d-table-cell border text-center" style={{"width": "30%"}}>items</div>
                    <div className="d-lg-table-cell border text-center">fragments d'un item</div>
                </div>
                <div className="d-table-row border">
                    <div className="d-table-cell">
                        <div className="border d-table w-100">
                            {generatedTextDescription}
                        </div>
                    </div>
                    <div className="d-table-cell">
                        <div className="border d-table w-100">
                            {generatedTextFragment}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _generateTextDescription() {
        const selectId = this.selectIdTextToAnalyse;
        const idTextToAnalyse = this.state.idTextToAnalyse;
        return this.props.items.map((text, id) => {
            const idIdentique = idTextToAnalyse === text.id;
            const class_name = idIdentique ? "d-table-row boder w-100 textSelected" : "d-table-row boder w-100";
            return (
                <div className={class_name}
                     key={id}
                     onClick={() => selectId(text.id)}>
                    <div className="d-table-cell border">
                        <p><b>name :</b> {text.name}</p>
                    </div>
                </div>
            )
        })
    }

    selectIdTextToAnalyse = (id) => {
        window.scrollTo(0, 0);
        if (id === this.state.idTextToAnalyse){
            this.setState({idTextToAnalyse: null})
        }else {
            this.setState({idTextToAnalyse: id});
        }
    };

    _generateTextFragment() {
        if (this.state.idTextToAnalyse === null) {
            return this.props.items.map(fragments=>{
                let resource= fragments.resource;
                resource =  resource ? <a href={resource[0]}><img style={{height:"15px",weight:"15px"}} alt="lien le texte d'origine" src={lien}/></a> : null
                fragments = Object.values(fragments);
                return fragments.map(
                    (fragment, idFragment) => {
                        return (
                            <div key={idFragment} className="d-table-row boder w-100">
                                <div className="d-table-cell border">
                                    {fragment.text ? fragment.text.map((text, idText) => (
                                        <p key={idText}>{text} {resource}</p>)) : null}
                                </div>
                            </div>
                        )
                    })
            })
        } else {
            let fragments = this.props.items.find((text) => text.id === this.state.idTextToAnalyse);
            let {resource} = fragments;
            resource =  resource ? <a href={resource[0]}><img style={{height:"15px",weight:"15px"}} alt="lien le texte d'origine" src={lien}/></a> : null
            fragments = Object.values(fragments);
            return fragments.map(
                (fragment, idFragment) => {
                    return (
                        <div key={idFragment} className="d-table-row boder w-100">
                            <div className="d-table-cell border">
                                {fragment.text ? fragment.text.map((text, idText) => (
                                    <p key={idText}>{text} {resource}</p>)) : null}
                            </div>
                        </div>
                    )
                })
        }
    }

    _generateLink() {
        if (this.state.idTextToAnalyse !== null) {
            let fragments = this.props.items.find((text) => text.id === this.state.idTextToAnalyse);
            return (
                <div className="d-table-row boder w-100">
                    <div className="d-table-cell border">
                        {fragments.resource.map((link, indice) => (
                            <a key={indice} href={link}>lien numéro {indice + 1}</a>))}
                    </div>
                </div>
            )
        }
    }
}