import React from 'react';
import { Table, Space, Input, Button, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import img from "../../assets/img/andre.jpg"
const data = [
  {
    key: '1',
    img: img, // por favor, reemplaza URL_TO_IMAGE con la url de tu imagen
    name: 'John Brown',
    last_name: 'Jim Green',
    gender: 'Male',
    blood_type: 'O+',
    detections: 2
  },
  {
    key: '2',
    img: img, // por favor, reemplaza URL_TO_IMAGE con la url de tu imagen
    name: 'Laura',
    last_name: 'Dominguez',
    gender: 'Female',
    blood_type: 'O+',
    detections: 4
  },
  // añade más objetos aquí para más filas en la tabla
];

class PatientsTable extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const columns = [
      {
        title: '',
        dataIndex: 'img',
        key: 'img',
        render: (text, record) => <img src={record.img} alt="patient" style={{width: '50px', height: '50px'}}/>
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Last Name',
        dataIndex: 'last_name',
        key: 'last_name',
        ...this.getColumnSearchProps('last_name'),
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        ...this.getColumnSearchProps('gender'),
      },
      {
        title: 'Blood Type',
        dataIndex: 'blood_type',
        key: 'blood_type',
        ...this.getColumnSearchProps('blood_type'),
      },
      {
        title: 'Detections',
        dataIndex: 'detections',
        key: 'detections',
        ...this.getColumnSearchProps('detections'),
      },
    ];
    return <Table columns={columns} dataSource={data} />;
  }
}

export default PatientsTable;
