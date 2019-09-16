import PropTypes from 'prop-types';
import React from 'react';

import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

import 'filepond/dist/filepond.min.css';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

//import { createAssetProxy } from 'netlify-cms-core/src/ValueObjects/AssetProxy';
//import { NetlifyCmsCore as CMS } from 'netlify-cms-core';


registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default class Control extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    classNameWrapper: PropTypes.string.isRequired,
    addAsset: PropTypes.func.isRequired,
    getAsset: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      // Set initial files, type 'local' means this is a file
      // that has already been uploaded to the server (see docs)
      files: [
        {
          source: "index.html",
          options: {
            type: "local"
          }
        }
      ]
    };
  }

  handleSubmit = e => {
    const assetProxy = '' //await createAssetProxy(fileName, file);
    this.props.onAddAsset(assetProxy);
  }

  render() {
    const {
      value,
      classNameWrapper,
      onAddAsset,
      getAsset,
      onChange,
    } = this.props;

    return (
      <div className={classNameWrapper}>
      { value
        ? <img src={getAsset(value)} />
        : <div>
            <FilePond
              ref={ref => (this.pond = ref)}
              files={this.state.files}
              allowMultiple={false}
              maxFiles={3}
              //server="/api"
              //oninit={() => this.handleInit()}
              onupdatefiles={fileItems => {
                console.log(fileItems);
                this.setState({
                  files: fileItems.map(fileItem => fileItem.file)
                });
              }}
              />
              <button onClick={this.handleSubmit.bind(null)}>Submit</button>
            </div>
      }
      </div>
    );
  }
}
