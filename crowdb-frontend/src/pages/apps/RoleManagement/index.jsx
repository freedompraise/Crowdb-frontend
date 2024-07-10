import React from 'react'
import {
	Button,
	Card,
	CardBody,
	Col,
	Form,
	Row,
	Spinner,
} from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { FormTextInput } from '@/components'
import { useRole } from './useRole'
import { PageBreadcrumb2 } from '@/components'
import { useForm, Controller } from 'react-hook-form'

const RoleComponent = () => {
	const { id } = useParams()
	const { role, permissions, loading, error, updateRole, deleteRole } =
		useRole(id)
	const navigate = useNavigate()
	const { control, handleSubmit } = useForm()

	const onSubmit = (data) => {
		updateRole(data)
	}

	const handleDelete = () => {
		deleteRole()
		navigate('/roles')
	}

	return (
		<div className="container">
			<PageBreadcrumb2
				title="Invite User"
				items={[
					{ title: 'Dashboard', link: '/dashboard' },
					{ title: 'Invite User' },
				]}
			/>
			<div className="card">
				{loading ? (
					<Spinner animation="border" />
				) : error ? (
					<p className="text-danger">{error}</p>
				) : (
					<Form
						className="form-horizontal auth-form"
						onSubmit={handleSubmit(onSubmit)}>
						<FormTextInput
							name="name"
							label="Role Name"
							type="text"
							placeholder="Enter Role Name"
							containerClass="mb-3"
							control={control}
							defaultValue={role?.name}
						/>
						<Row className="form-group mb-3">
							<Col xs={12}>
								<label>Permissions</label>
								{permissions.map((permission) => (
									<div key={permission.id} className="form-check">
										<Controller
											name={`permissions.${permission.id}`}
											control={control}
											defaultValue={
												role?.permissions?.includes(permission.id) || false
											}
											render={({ field }) => (
												<input
													type="checkbox"
													className="form-check-input"
													id={`permission-${permission.id}`}
													{...field}
													checked={field.value}
												/>
											)}
										/>
										<label
											className="form-check-label"
											htmlFor={`permission-${permission.id}`}>
											{permission.name}
										</label>
									</div>
								))}
							</Col>
						</Row>
						<Row className="form-group mb-0">
							<Col xs={12} className="mt-2">
								<Button
									variant="primary"
									className="w-100 waves-effect waves-light"
									type="submit">
									Save Changes <i className="fas fa-save ms-1"></i>
								</Button>
							</Col>
							<Col xs={12} className="mt-2">
								<Button
									variant="danger"
									className="w-100 waves-effect waves-light"
									onClick={handleDelete}>
									Delete Role <i className="fas fa-trash ms-1"></i>
								</Button>
							</Col>
						</Row>
					</Form>
				)}
			</div>
		</div>
	)
}

export default RoleComponent